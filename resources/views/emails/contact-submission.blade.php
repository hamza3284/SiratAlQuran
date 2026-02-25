<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #E6C77B; /* Gold from the app theme */
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">New Contact Message</div>
        
        <div class="field">
            <div class="label">Name:</div>
            <div>{{ $contact->name }}</div>
        </div>
        
        <div class="field">
            <div class="label">Email:</div>
            <div>{{ $contact->email }}</div>
        </div>
        
        <div class="field">
            <div class="label">Message:</div>
            <div style="white-space: pre-wrap;">{{ $contact->message }}</div>
        </div>
        
        <div class="footer">
            This message was sent from the SiratAlQuran contact form.
        </div>
    </div>
</body>
</html>
