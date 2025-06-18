# main.tf
resource "azurerm_storage_account" "this" {
  name                     = var.storage_account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = var.account_tier
  account_replication_type = var.account_replication_type
  account_kind             = var.account_kind

  # Optional: System assigned identity
  dynamic "identity" {
    for_each = var.enable_system_assigned_identity ? [1] : []
    content {
      type = "SystemAssigned"
    }
  }

  # Optional: Network rules
  dynamic "network_rules" {
    for_each = var.enable_network_rules ? [1] : []
    content {
      default_action             = var.network_rules_default_action
      ip_rules                   = var.network_rules_ip_rules
      virtual_network_subnet_ids = var.virtual_network_subnet_ids
    }
  }

  # Optional: Static website
  dynamic "static_website" {
    for_each = var.enable_static_website ? [1] : []
    content {
      index_document     = var.static_website_index_document
      error_404_document = var.static_website_error_404_document
    }
  }

  # Optional: CORS rules for blob storage
  dynamic "blob_properties" {
    for_each = var.enable_blob_cors ? [1] : []
    content {
      dynamic "cors_rule" {
        for_each = var.blob_cors_rules
        content {
          allowed_headers    = cors_rule.value.allowed_headers
          allowed_methods    = cors_rule.value.allowed_methods
          allowed_origins    = cors_rule.value.allowed_origins
          exposed_headers    = cors_rule.value.exposed_headers
          max_age_in_seconds = cors_rule.value.max_age_in_seconds
        }
      }
    }
  }

  # Optional: Customer managed key encryption
  dynamic "customer_managed_key" {
    for_each = var.enable_customer_managed_key ? [1] : []
    content {
      key_vault_key_id          = var.key_vault_key_id
      user_assigned_identity_id = var.user_assigned_identity_id
    }
  }

  # Optional: Azure Files AD authentication
  dynamic "azure_files_authentication" {
    for_each = var.enable_azure_files_authentication ? [1] : []
    content {
      directory_type = var.azure_files_directory_type

      dynamic "active_directory" {
        for_each = var.azure_files_directory_type == "AD" ? [1] : []
        content {
          domain_name         = var.ad_domain_name
          domain_guid         = var.ad_domain_guid
          domain_sid          = var.ad_domain_sid
          storage_sid         = var.ad_storage_sid
          forest_name         = var.ad_forest_name
          netbios_domain_name = var.ad_netbios_domain_name
        }
      }

      default_share_level_permission = var.azure_files_default_share_permission
    }
  }

  tags = var.tags
}
