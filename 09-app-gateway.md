
## Protect against common OWASP attacks with Application Gateway and the Web Firewall

Our application has a SQL injection issue.  Load the API endpoint /api/menu?filter=Sandwich in your browser.  It will return only menu items with the text "Sandwich" in them.
However, the developers didn't properly parameterize the SQL WHERE clause, so it is vulnerable to injection attacks.  Enter the URL:

    /api/menu?filter=%'; UPDATE MenuOption SET Name=Name+' HACKED!'--

in your browser, then load the /api/menu URL again.  You will see that the names of the products have been changed.

To protect against issues like this we will put the site behind an Application Gateway with the Web Firewall feature enabled.

1.
