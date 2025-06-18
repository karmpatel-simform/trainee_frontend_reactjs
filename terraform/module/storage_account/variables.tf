

# variables.tf
# Required variables
variable "storage_account_name" {
  description = "Name of the storage account"
  type        = string
  validation {
    condition     = length(var.storage_account_name) >= 3 && length(var.storage_account_name) <= 24 && can(regex("^[a-z0-9]+$", var.storage_account_name))
    error_message = "Storage account name must be between 3 and 24 characters, contain only lowercase letters and numbers."
  }
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region for resources"
  type        = string
}

# Basic storage account settings
variable "account_tier" {
  description = "Storage account tier"
  type        = string
  default     = "Standard"
  validation {
    condition     = contains(["Standard", "Premium"], var.account_tier)
    error_message = "Account tier must be either Standard or Premium."
  }
}

variable "account_replication_type" {
  description = "Storage account replication type"
  type        = string
  default     = "LRS"
  validation {
    condition     = contains(["LRS", "GRS", "RAGRS", "ZRS", "GZRS", "RAGZRS"], var.account_replication_type)
    error_message = "Invalid replication type."
  }
}

variable "account_kind" {
  description = "Storage account kind"
  type        = string
  default     = "StorageV2"
  validation {
    condition     = contains(["BlobStorage", "BlockBlobStorage", "FileStorage", "Storage", "StorageV2"], var.account_kind)
    error_message = "Invalid account kind."
  }
}

# Feature toggles
variable "enable_system_assigned_identity" {
  description = "Enable system assigned managed identity"
  type        = bool
  default     = false
}

variable "enable_network_rules" {
  description = "Enable network access rules"
  type        = bool
  default     = false
}

variable "enable_static_website" {
  description = "Enable static website hosting"
  type        = bool
  default     = false
}

variable "enable_blob_cors" {
  description = "Enable CORS rules for blob storage"
  type        = bool
  default     = false
}

variable "enable_customer_managed_key" {
  description = "Enable customer managed key encryption"
  type        = bool
  default     = false
}

variable "enable_azure_files_authentication" {
  description = "Enable Azure Files authentication"
  type        = bool
  default     = false
}

# Network rules variables
variable "network_rules_default_action" {
  description = "Default action for network rules"
  type        = string
  default     = "Deny"
  validation {
    condition     = contains(["Allow", "Deny"], var.network_rules_default_action)
    error_message = "Default action must be Allow or Deny."
  }
}

variable "network_rules_ip_rules" {
  description = "List of IP rules for network access"
  type        = list(string)
  default     = []
}

variable "virtual_network_subnet_ids" {
  description = "List of virtual network subnet IDs"
  type        = list(string)
  default     = []
}

# Static website variables
variable "static_website_index_document" {
  description = "Index document for static website"
  type        = string
  default     = "index.html"
}

variable "static_website_error_404_document" {
  description = "404 error document for static website"
  type        = string
  default     = "404.html"
}

# CORS variables
variable "blob_cors_rules" {
  description = "List of CORS rules for blob storage"
  type = list(object({
    allowed_headers    = list(string)
    allowed_methods    = list(string)
    allowed_origins    = list(string)
    exposed_headers    = list(string)
    max_age_in_seconds = number
  }))
  default = [{
    allowed_headers    = ["*"]
    allowed_methods    = ["GET", "HEAD", "POST", "PUT", "DELETE"]
    allowed_origins    = ["*"]
    exposed_headers    = ["*"]
    max_age_in_seconds = 3600
  }]
}

# Customer managed key variables
variable "key_vault_key_id" {
  description = "Key Vault key ID for customer managed encryption"
  type        = string
  default     = null
}

variable "user_assigned_identity_id" {
  description = "User assigned identity ID for customer managed encryption"
  type        = string
  default     = null
}

# Azure Files authentication variables
variable "azure_files_directory_type" {
  description = "Directory type for Azure Files authentication"
  type        = string
  default     = "AD"
  validation {
    condition     = contains(["AD", "AADDS"], var.azure_files_directory_type)
    error_message = "Directory type must be AD or AADDS."
  }
}

variable "azure_files_default_share_permission" {
  description = "Default share level permission for Azure Files"
  type        = string
  default     = "StorageFileDataSmbShareContributor"
}

# Active Directory variables
variable "ad_domain_name" {
  description = "Active Directory domain name"
  type        = string
  default     = null
}

variable "ad_domain_guid" {
  description = "Active Directory domain GUID"
  type        = string
  default     = null
}

variable "ad_domain_sid" {
  description = "Active Directory domain SID"
  type        = string
  default     = null
}

variable "ad_storage_sid" {
  description = "Active Directory storage SID"
  type        = string
  default     = null
}

variable "ad_forest_name" {
  description = "Active Directory forest name"
  type        = string
  default     = null
}

variable "ad_netbios_domain_name" {
  description = "Active Directory NetBIOS domain name"
  type        = string
  default     = null
}

# Common variables
variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

