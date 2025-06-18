module "storoage_account" {
  source = "./module/storage_account"

  storage_account_name = "strgaccdev"
  resource_group_name  = azurerm_resource_group.rg.name
  location             = azurerm_resource_group.rg.location

  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"

  enable_static_website = true

  static_website_index_document     = "index.html"
  static_website_error_404_document = "404.html"
}



