var sheetName = 'contact form';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    Logger.log('📨 Form submission received. Params: ' + JSON.stringify(e.parameter));
    
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    if (!doc) {
      throw new Error('❌ Spreadsheet could not be opened. Did you run intialSetup()?');
    }
    
    var sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('❌ Sheet named "' + sheetName + '" not found. Check sheet tab name.');
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      if (header.toLowerCase() === 'time') {
        return getPakistanTimeFormatted();
      }
      return e.parameter[header] || '';
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    Logger.log('✅ Row ' + nextRow + ' added to sheet');

    // Extract submitted values
    var userName = e.parameter['Name'] || 'Anonymous';
    var userEmail = e.parameter['Email'] || '';
    var userSubject = e.parameter['Subject'] || 'No Subject';
    var userMessage = e.parameter['Message'] || '';

    // Send email to yourself
    MailApp.sendEmail({
      to: "shoaibseelro5@gmail.com",  // 🔁 CHANGE THIS TO YOUR EMAIL
      subject: "New Message from Portfolio Contact Form - " + userSubject,
      htmlBody: "<b>Name:</b> " + userName + "<br>" +
                "<b>Email:</b> " + userEmail + "<br>" +
                "<b>Subject:</b> " + userSubject + "<br>" +
                "<b>Message:</b><br>" + userMessage
    });
    Logger.log('✅ Notification email sent to shoaibseelro5@gmail.com');

    // Send confirmation email to the user
    if (userEmail && userEmail.includes('@')) {
      MailApp.sendEmail({
        to: userEmail,
        subject: "Thanks for contacting Shoaib Ahmed!",
        htmlBody: "Dear " + userName + ",<br><br>" +
                  "Thank you for reaching out to me regarding: <b>" + userSubject + "</b><br>" +
                  "I've received your message and will get back to you soon.<br><br>" +
                  "<b>Your message:</b><br>" + userMessage + "<br><br>" +
                  "Best regards,<br>Shoaib Ahmed"
      });
      Logger.log('✅ Confirmation email sent to ' + userEmail);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    Logger.log('❌ ERROR: ' + e.toString() + ' | Stack: ' + e.stack);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': e.toString(),
        'details': e.message || e.name
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}

// Format date in "12 July 2025, 1:45 PM" for Pakistan
function getPakistanTimeFormatted() {
  var timezone = 'Asia/Karachi';
  var now = new Date();
  return Utilities.formatDate(now, timezone, "dd MMMM yyyy, h:mm a");
}
