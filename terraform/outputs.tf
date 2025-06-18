output "storage_account_link" {
  value       = module.storoage_account.static_website_url
  description = "Storage Account URL"
}

output "storage_account_name" {
  value = module.storoage_account.storage_account_name
}

output "storage_account_primary_access_key" {
  value     = module.storoage_account.primary_access_key
  sensitive = true
}
