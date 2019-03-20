# az-cli.ps1

<#
# The following two lines are only used when working remotely using the CMFG VPN.
$env:HTTP_PROXY = ""
$env:HTTPs_PROXY = ""
#>
<#
$reg = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"
$settings = Get-ItemProperty -Path $reg
$ie = New-Object -com internetexplorer.application

Set-ItemProperty -Path $reg -Name AutoConfig -Value "http://bcproxyconf.cmutual.com/proxy/bcpproxy01.pac"
$ie.navigate2("www.google.com")
$ie.visible = $true
Start-Sleep -s 5
"Done with Proxy 1"

Set-ItemProperty -Path $reg -Name AutoConfig -Value "http://bcproxyconf.cmutual.com/proxy/bcpproxy02.pac"
$ie.navigate2("www.google.com")
Start-Sleep -s 5
"Done with Proxy 2"

$ie.quit()
#>
# Only required when running on the corporate network or VPN
# 10.75.233.15 and 10.75.233.16 are alternative proxies
# Should the IP address shown below become unavailable, try switch to the other 
$proxyIP = '10.75.233.16:8080'

# Required for workstations running Netskope
$cacertFile = 'C:\certs\cacert.pem'

$proxyUrl = "http://${proxyIP}"
$env:HTTPS_PROXY = $proxyUrl
$env:HTTP_PROXY = $proxyUrl

# Tells Netskope where to find you 
$env:REQUESTS_CA_BUNDLE = $cacertFile

# we want these to stick around after we close the shell
[System.Environment]::SetEnvironmentVariable("HTTPS_PROXY", $proxyUrl, "User")
[System.Environment]::SetEnvironmentVariable("HTTP_PROXY", $proxyUrl, "User")
[System.Environment]::SetEnvironmentVariable("REQUESTS_CA_BUNDLE", $cacertFile, "User")

"Done with Proxy 3"

#NPM and Kubernetes settings, you might not need these, but they won't hurt either.
[System.Environment]::SetEnvironmentVariable("KUBECONFIG", $ENV:USERPROFILE +"\.kube\config" , "User")
npm config set proxy $proxyIP