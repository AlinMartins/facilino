// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2017 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

package com.google.appinventor.components.runtime.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import android.content.Intent;
import android.provider.Telephony.Sms.Intents;
import android.telephony.SmsMessage;

/**
 * Helper methods for calling APIs added in KITKAT (4.4, API level 19)
 *
 * @author Evan W. Patton (ewpatton@mit.edu)
 *
 */
public final class KitkatUtil {

  private KitkatUtil() {
  }

  /**
   * Retrieve any SmsMessage objects encoded in the SMS_RECEIVED intent.
   *
   * @param intent An intent passed by Android to the SMS_RECEIVED receiver.
   * @return A list of SmsMessages. The list will be non-null but zero length if the intent lacks
   *   SMS content.
   */
  public static List<SmsMessage> getMessagesFromIntent(Intent intent) {
    List<SmsMessage> result = new ArrayList<SmsMessage>();
    SmsMessage[] messages = Intents.getMessagesFromIntent(intent);
    if (messages != null && messages.length >= 0) {
      Collections.addAll(result, messages);
    }
    return result;
  }
}
