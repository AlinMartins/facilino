 // -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2016 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

package es.roboticafacil.facilino.runtime;

import java.util.*;
import com.google.appinventor.components.runtime.*;
import com.google.appinventor.components.annotations.DesignerComponent;
import com.google.appinventor.components.annotations.PropertyCategory;
import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.annotations.SimpleEvent;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.SimpleProperty;
import com.google.appinventor.components.annotations.DesignerProperty;
import com.google.appinventor.components.annotations.UsesPermissions;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.common.YaVersion;
import com.google.appinventor.components.runtime.util.SdkLevel;
import es.roboticafacil.facilino.runtime.Facilino;
import es.roboticafacil.facilino.runtime.FacilinoBase;
import com.google.appinventor.components.runtime.util.YailList;

//import java.lang.Class;
import java.lang.reflect.*;
import java.util.Set;
/**
 * A TCRT5000 component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A TCRT5000 component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/TCRT5000_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class TCRT5000  extends AnalogRead {
  private int _black;
  private int _white;
  private boolean _firstTime;
  
  /**
   * Creates a new Facilino component.
   */
  public TCRT5000(ComponentContainer container) {
	  super(container);
	  this.logTag="TCRT5000";
	  this._type=FacilinoBase.TYPE_INFRARED;
	  _dataDispatched=false;
	  _firstTime=true;
	  _pin=0;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public int Black() {
    return _black;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "1023")
  @SimpleProperty(description = "Black is anything above this value [0-1023]")
  public void Black(int value) {
    _black = value;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public int White() {
    return _white;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "0")
  @SimpleProperty(description = "White is anything below this value [0-1023]")
  public void White(int value) {
    _white = value;
  }  
	
	@SimpleEvent(description = "Black event.")
    public void BlackDetected(){
        EventDispatcher.dispatchEvent(this, "BlackDetected");
    }
	
	@SimpleEvent(description = "White event.")
    public void WhiteDetected(){
        EventDispatcher.dispatchEvent(this, "WhiteDetected");
    }
	
	@SimpleEvent(description = "Digital read change event.")
    public void Changed(boolean value){
        EventDispatcher.dispatchEvent(this, "changed",value);
    }
	
	@Override
  public void dispatchData(byte cmd, byte[] data) {
	  if ((data[0]==_pin))
	  {
		  _value = (((int)data[1]<<8)&0xFF00)|(((int)data[2])&0x00FF);
		  if (_value<_white)
			  WhiteDetected();
		  else if (_value>_black)
			  BlackDetected();
		  if (_firstTime)
			  _firstTime=false;
		  Received(_value);
		  _dataDispatched=true;
	  }
  }

}
