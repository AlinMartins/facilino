// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2009-2011 Google, All Rights reserved
// Copyright 2011-2012 MIT, All rights reserved
// Released under the MIT License https://raw.github.com/mit-cml/app-inventor/master/mitlicense.txt

package com.google.zxing.client.android.camera;
import android.os.Build;

/**
 * Support for discovering which version of the Android SDK is on the phone.
 *
 * For more information about Android API levels see
 * http://developer.android.com/guide/appendix/api-levels.html.
 *
 * @author sharon@google.com (Sharon Perl)
 */
public class SdkLevel {
  public static final int LEVEL_CUPCAKE = 3;              // a.k.a. 1.5
  public static final int LEVEL_DONUT = 4;                // a.k.a. 1.6
  public static final int LEVEL_ECLAIR = 5;               // a.k.a. 2.0
  public static final int LEVEL_ECLAIR_0_1 = 6;           // a.k.a. 2.0.1
  public static final int LEVEL_ECLAIR_MR1 = 7;           // a.k.a. 2.1
  public static final int LEVEL_FROYO = 8;                // a.k.a. 2.2
  public static final int LEVEL_GINGERBREAD = 9;          // a.k.a. 2.3
  public static final int LEVEL_GINGERBREAD_MR1 = 10;     // a.k.a. 2.3.3
  public static final int LEVEL_HONEYCOMB = 12;           // a.k.a. 3.0
  public static final int LEVEL_HONEYCOMB_MR2 = 13;       // a.k.a. 3.2
  public static final int LEVEL_ICE_CREAM_SANDWICH = 14;  // a.k.a. 4.0
  public static final int LEVEL_JELLYBEAN = 16;           // a.k.a. 4.1
  public static final int LEVEL_JELLYBEAN_MR1 = 17;       // a.k.a. 4.2
  public static final int LEVEL_JELLYBEAN_MR2 = 18;       // a.k.a. 4.3

  private SdkLevel() {
  }

  /**
   * Returns the API level of the SDK on the phone
   */
  public static int getLevel() {
    // Determine the SDK version in a way that is compatible with API level 3.
    return Integer.parseInt(Build.VERSION.SDK);
  }
}
