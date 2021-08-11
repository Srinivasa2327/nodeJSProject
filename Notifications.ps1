param([String]$envName,
[String]$status
)
echo $envName
echo $envID


$JSONBody = [PSCustomObject][Ordered]@{
"@type" = "MessageCard"
"@context" = "<http://schema.org/extensions>"
"summary" = "test"
"themeColor" = '0078D7'
"title" = "Deployment Status"
"text" = "`n 
EnvName: $($envNamer)`n
Status: $($envID) 
"
}

$TeamMessageBody = ConvertTo-Json $JSONBody

$parameters = @{
"URI" = "https://inlinemarketevolutionoy.webhook.office.com/webhookb2/0da9231a-2d3c-4f8e-bda1-767017fbee8b@1e3ee4c0-94a9-45a4-9151-07e1858e6372/IncomingWebhook/471e30b85bff43fb97d37a5235b38799/4b3fb30e-1e8c-4832-be5d-df3bcd5271bc"
"Method" = 'POST'
"Body" = $TeamMessageBody
"ContentType" = 'application/json'
}

Invoke-RestMethod @parameters