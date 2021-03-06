package es.roboticafacil.facilino;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.preference.SwitchPreference;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.Window;
import android.webkit.ConsoleMessage;
import android.webkit.JsPromptResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.Toast;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

public class MainActivity extends AppCompatActivity implements SharedPreferences.OnSharedPreferenceChangeListener {
    private WebView myWebView;
    private final Activity activity = this;
    private final Context context = this;
    private String filename = "filename.bly";
    private SharedPreferences sharedPref;
    private String lang_value;
    private String processor_value;
    private String license_value="";
    private boolean license_switch;
    private boolean license_active=false;
    private boolean code_shown=false;
    private boolean doc_shown=false;
    private boolean undo_shown=false;
    private boolean redo_shown=false;
    private boolean once=true;

    @Override
    protected void onPause() {
        super.onPause();
        SharedPreferences.Editor preferencesEditor = sharedPref.edit();
        preferencesEditor.putString("language_list", lang_value);
        preferencesEditor.putString("processor_list", processor_value);
        preferencesEditor.putBoolean("license_switch", license_switch);
        preferencesEditor.putString("license_text", license_value);
        preferencesEditor.apply();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*try {
            Runtime.getRuntime().exec("ln -s file:///android_asset/html/doc/en-GB/ file:///android_asset/html/doc/lt-ES/");
        }
        catch(IOException ioEx) {
            ioEx.printStackTrace(); // or what ever you want to do with it
        }*/
        Window w = getWindow();
        w.setTitle(context.getString(R.string.app_name));
        setContentView(R.layout.activity_main);
        myWebView = (WebView) findViewById(R.id.webview);
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setDomStorageEnabled(true);
        myWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
        sharedPref = PreferenceManager.getDefaultSharedPreferences(context);
        sharedPref.registerOnSharedPreferenceChangeListener(this);
        lang_value = sharedPref.getString("language_list", "en-GB");
        processor_value = sharedPref.getString("processor_list", "ArduinoNano");
        license_switch = sharedPref.getBoolean("license_switch", false);
        if (license_switch) {
            if (!license_value.equals(sharedPref.getString("license_text", ""))) {
                license_value = sharedPref.getString("license_text", "");
                checkLicense();
            }
        } else {
            if (once) {
                Toast.makeText(context, R.string.demo_version, Toast.LENGTH_LONG).show();
                license_value = "";
                once = false;
            }
        }
        SharedPreferences.Editor preferencesEditor = sharedPref.edit();
        preferencesEditor.putBoolean("code_switch", code_shown);
        preferencesEditor.putBoolean("doc_switch", doc_shown);
        preferencesEditor.apply();
        //switchPreference;

        activity.setTitle(context.getString(R.string.app_name));

        myWebView.setWebChromeClient(new WebChromeClient() {

            /*public void onProgressChanged(WebView view, int progress) {
                activity.setTitle(context.getString(R.string.app_name) + " " + context.getString(R.string.loading) + "..." + progress + "%");
                activity.setProgress(progress * 100);

                if (progress == 100) {
                    activity.setTitle(context.getString(R.string.app_name));
                }
            }*/

            public boolean onConsoleMessage(ConsoleMessage cm) {
                Log.d("Facilino", cm.message() + " -- From line "
                        + cm.lineNumber() + " of "
                        + cm.sourceId());
                return true;
            }

            @Override
            public boolean onJsPrompt(WebView view, String origin, String message, String defaultValue, final JsPromptResult result) {
                final EditText txtUrl = new EditText(context);
                txtUrl.setSingleLine();
                new AlertDialog.Builder(context)
                        .setTitle(R.string.prompt_title)
                        .setMessage(message)
                        .setView(txtUrl)
                        .setPositiveButton(android.R.string.ok,
                                new AlertDialog.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int wicht) {
                                        result.confirm(txtUrl.getText().toString());
                                    }
                                }).setCancelable(false)
                        .create()
                        .show();
                return true;
            }

            ;
        });

        myWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                // Handle the error
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        if (lang_value.equals(""))
            lang_value = "en-GB";
        if (processor_value.equals(""))
            processor_value = "ArduinoNano";

        //myWebView.loadUrl("file:///android_asset/html/indexAndroid.html?language="+lang_value+"&processor="+ processor_value);
        if (isTablet(context)) {
            String URL = "file:///android_asset/html/indexAndroid.html?language="+lang_value+"&processor="+ processor_value;
            myWebView.loadUrl(URL);
        } else
        {
            String URL = "file:///android_asset/html/indexAndroidPhone.html?language="+lang_value+"&processor="+ processor_value;
            myWebView.loadUrl(URL);
        }
    }

    public void showHideUndo(boolean state){
        undo_shown=state;
        invalidateOptionsMenu();
    }

    public void showHideRedo(boolean state){
        redo_shown=state;
        invalidateOptionsMenu();
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        menu.findItem(R.id.action_undo).setVisible(undo_shown);
        menu.findItem(R.id.action_redo).setVisible(redo_shown);
        return super.onPrepareOptionsMenu(menu);
    }

    @Override
    public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String s) {
        boolean reload = false;
        if (!lang_value.equals(sharedPref.getString("language_list",""))) {
            reload = true;
            lang_value = sharedPref.getString("language_list","en-GB");
        }
        if (!processor_value.equals(sharedPref.getString("processor_list",""))) {
            reload = true;
            processor_value = sharedPref.getString("processor_list","ArduinoNano");
        }
        if (reload)
            myWebView.loadUrl("file:///android_asset/html/indexAndroid.html?language="+lang_value+"&processor="+ processor_value);
        if (sharedPreferences.getBoolean("code_switch",false)&&!code_shown) {
            myWebView.evaluateJavascript("showCode();", null);
            code_shown=true;
        }
        else if (!sharedPreferences.getBoolean("code_switch",false)&&code_shown) {
            myWebView.evaluateJavascript("hideCode();", null);
            code_shown=false;
        }
            if (sharedPreferences.getBoolean("doc_switch", false) && !doc_shown) {
                if (lang_value.equals("en-GB")) {
                    myWebView.evaluateJavascript("showDoc();", null);
                    doc_shown = true;
                }
                else {
                    //Toast.makeText(context, R.string.doc_missing, Toast.LENGTH_LONG).show();
                    myWebView.evaluateJavascript("hideDoc();", null);
                    doc_shown = false;
                    //SharedPreferences.Editor editor = sharedPreferences.edit();
                    //editor.putBoolean("doc_switch",false);
                    //editor.commit();
                }
            } else if (!sharedPreferences.getBoolean("doc_switch", false) && doc_shown) {
                myWebView.evaluateJavascript("hideDoc();", null);
                doc_shown = false;
            }
        if (sharedPreferences.getBoolean("license_switch",false)) {
            if (!license_value.equals(sharedPref.getString("license_text", ""))) {
                license_value = sharedPref.getString("license_text", "");
                checkLicense();
            }
        }
        /*else {
            if (once) {
                Toast.makeText(context, R.string.demo_version, Toast.LENGTH_LONG).show();
                license_value = "";
                once=false;
            }
        }*/
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.icons_menu, menu);
        inflater.inflate(R.menu.options_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.action_new:
                startNewProgram();
                return true;
            case R.id.action_download:
                saveXml();
                return true;
            case R.id.action_upload:
                openXml();
                return true;
            case R.id.action_zoomin:
                zoomIn();
                return true;
            case R.id.action_zoomout:
                zoomOut();
                return true;
            case R.id.action_arduino:
                exportArduino();
                return true;
            case R.id.action_undo:
                undo();
                return true;
            case R.id.action_redo:
                redo();
                return true;
            case R.id.setting:
                showSettings();
                return true;
            case R.id.shop:
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://roboticafacil.es/en/prod/facilino-license/"));
                startActivity(browserIntent);
                return true;
            case R.id.multiplatform:
                showMultiplatform();
                return true;
            case R.id.about:
                showAbout();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    private void startNewProgram(){
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(context);
        alertDialog.setTitle(R.string.new_title);
        alertDialog.setMessage(R.string.new_are_you_sure);
        alertDialog.setIcon(R.drawable.ic_insert_drive_file_white_24dp);
        alertDialog.setPositiveButton(R.string.new_yes, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog,int which) {
                myWebView.evaluateJavascript("resetWorkspace();",null);
                activity.setTitle(context.getString(R.string.app_name));
            }
        });
        alertDialog.setNegativeButton(R.string.new_no, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });
        alertDialog.show();
    };

    private void zoomIn() {
        myWebView.evaluateJavascript("zoomIn();",null);
    }

    private void zoomOut(){
        myWebView.evaluateJavascript("zoomOut();",null);
    }

    private void undo(){
        myWebView.evaluateJavascript("butUndo();",null);
    }

    private void redo(){
        myWebView.evaluateJavascript("butRedo();",null);
    }

    private void exportArduino(){
        myWebView.evaluateJavascript("exportArduino();", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String s) {
                Intent launchIntent = getPackageManager().getLaunchIntentForPackage("name.antonsmirnov.android.arduinodroid2");
                if (launchIntent != null) {
                    ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                    ClipData clip = ClipData.newPlainText("Arduino code",escapeCode(s));
                    clipboard.setPrimaryClip(clip);
                    Toast toast = Toast.makeText(context, "Code copied to clipboard",Toast.LENGTH_LONG);
                    toast.show();
                    startActivity(launchIntent);//null pointer check in case package name was not found
                }
                else
                {
                    Toast toast_arduinodroid = Toast.makeText(context, "ArduinoDroid App not found!",Toast.LENGTH_LONG);
                    toast_arduinodroid.show();
                }
            }
        });
    }

    private void saveXml(){
        SimpleFileDialog FileSaveDialog =  new SimpleFileDialog(context, "FileSave",
                new SimpleFileDialog.SimpleFileDialogListener()
                {
                    @Override
                    public void onChosenDir(String chosenDir)
                    {
                        final String _chosenDir= chosenDir;
                        // The code in this function will be executed when the dialog OK button is pushed
                        myWebView.evaluateJavascript("saveXml();", new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String s) {
                                String str = escapeXML(s);
                                File f = new File(_chosenDir);
                                FileOutputStream outputStream;
                                try {
                                    outputStream = new FileOutputStream(f,false);
                                    outputStream.write(str.getBytes());
                                    outputStream.close();
                                    activity.setTitle(context.getString(R.string.app_name) + " " + f.getName());
                                    Toast.makeText(context,context.getString(R.string.toast_file_saved)+" " + f.getName(), Toast.LENGTH_LONG).show();
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        });
                    }
                });
        //You can change the default filename using the public variable "Default_File_Name"
        FileSaveDialog.Default_File_Name = filename;
        FileSaveDialog.chooseFile_or_Dir();
    }

    private void openXml()
    {
        SimpleFileDialog FileOpenDialog =  new SimpleFileDialog(MainActivity.this, "FileOpen",
                new SimpleFileDialog.SimpleFileDialogListener()
                {
                    @Override
                    public void onChosenDir(String chosenDir)
                    {
                        final String _chosenDir= chosenDir;
                        File f = new File(_chosenDir);
                        StringBuilder text = new StringBuilder();
                        try {
                            BufferedReader br = new BufferedReader(new FileReader(f));
                            String line;
                            while ((line = br.readLine()) != null) {
                                text.append(line);
                            }
                            br.close();
                        }
                        catch (IOException e) {
                            //You'll need to add proper error handling here
                        }
                        // The code in this function will be executed when the dialog OK button is pushed
                        myWebView.evaluateJavascript("openXml('" + escapeCharacters(text.toString()) + "');", new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String s) {
                                if (s.equals("true")) {
                                    File f = new File(_chosenDir);
                                    activity.setTitle(context.getString(R.string.app_name) + " " + f.getName());
                                    Toast.makeText(context, context.getString(R.string.open_success), Toast.LENGTH_LONG).show();
                                }
                                else {
                                    activity.setTitle(context.getString(R.string.app_name));
                                    Toast.makeText(context, context.getString(R.string.open_failed), Toast.LENGTH_LONG).show();
                                }
                            }
                        });
                    }
                });

        //You can change the default filename using the public variable "Default_File_Name"
        FileOpenDialog.Default_File_Name = "";
        FileOpenDialog.chooseFile_or_Dir();
    }

    private String escapeCode(String s)
    {
        String newline = System.getProperty("line.separator");
        char[] charArray = s.toCharArray();
        StringBuilder str = new StringBuilder().append("");
        for (int i=1;i<charArray.length-1;i++)
        {
            if (charArray[i]=='\\'&&charArray[i+1]=='n') {
                str.append(newline);
                i=i+1;
                continue;
            }
            if (i<charArray.length-5)
            {
                if (charArray[i]=='\\'&&charArray[i+1]=='u'&&charArray[i+2]=='0'&&charArray[i+3]=='0'&&charArray[i+4]=='3'&&charArray[i+5]=='C')
                {
                    str.append('<');
                    i=i+5;
                    continue;
                }
                if (charArray[i]=='\\'&&charArray[i+1]=='u'&&charArray[i+2]=='0'&&charArray[i+3]=='0'&&charArray[i+4]=='3'&&charArray[i+5]=='E')
                {
                    str.append('>');
                    i=i+5;
                    continue;
                }
            }
            str=str.append(charArray[i]);
        }
        String output =str.toString();
        return output;
    }

    private String escapeCharacters(String string)
    {
        string=string.replaceAll("\\/g","\\");
        string=string.replaceAll("\"/g","\\\"");
        return string;
    }

    private String escapeXML(String s)
    {
        char[] charArray = s.toCharArray();
        StringBuilder str = new StringBuilder().append("");
        for (int i=1;i<charArray.length-1;i++)
        {
            if (charArray[i]=='\\'&&charArray[i+1]=='"') {
                str.append('"');
                i=i+1;
                continue;
            }
            if (i<charArray.length-5)
            {
                if (charArray[i]=='\\'&&charArray[i+1]=='u'&&charArray[i+2]=='0'&&charArray[i+3]=='0'&&charArray[i+4]=='3'&&charArray[i+5]=='C')
                {
                    str.append('<');
                    i=i+5;
                    continue;
                }
                if (charArray[i]=='\\'&&charArray[i+1]=='u'&&charArray[i+2]=='0'&&charArray[i+3]=='0'&&charArray[i+4]=='3'&&charArray[i+5]=='E')
                {
                    str.append('>');
                    i=i+5;
                    continue;
                }
            }
            str=str.append(charArray[i]);
        }
        String output =str.toString();
        return output;
    }

    private void showMultiplatform(){
        Intent myIntent = new Intent(context, MultiplatformActivity.class);
        startActivity(myIntent);
    };

    private void showSettings(){
        Intent myIntent = new Intent(context, SettingsActivity.class);
        startActivity(myIntent);
    };

    private void showAbout(){
        Intent myIntent = new Intent(context, AboutActivity.class);
        startActivity(myIntent);
    }

    private boolean isTablet(Context context) {
        boolean xlarge = ((context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == 4);
        boolean large = ((context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_LARGE);
        return (xlarge || large);
    }

    private void checkLicense()
    {
        if (isOnline()) {
            Toast.makeText(context, R.string.checking_license, Toast.LENGTH_LONG).show();
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    myWebView.evaluateJavascript("checkLicense('" + license_value + "');", new ValueCallback<String>() {
                        @Override
                        public void onReceiveValue(String s) {
                            if (s.equals("true")) {
                                Toast.makeText(context, R.string.license_active, Toast.LENGTH_LONG).show();
                                license_active=true;
                            }
                            else {
                                Toast.makeText(context, R.string.license_not_active, Toast.LENGTH_LONG).show();
                                license_active=false;
                            }
                        }
                    });
                }
            }, 2000);

        }
        else
            Toast.makeText(context, R.string.internet_connection, Toast.LENGTH_SHORT).show();
    }

    private boolean isOnline() {
        ConnectivityManager cm =(ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return netInfo != null && netInfo.isConnectedOrConnecting();
    }

}