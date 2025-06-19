terraform {
  required_providers {
    azurerm = {
      version = ">=3.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
  required_version = ">=1.0"

  backend "azurerm" {
    resource_group_name  = "IdentityGroup"
    storage_account_name = "identitystorage12"
    container_name       = "storage1"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}

  # use_oidc        = true
  # client_id       = var.client_id
  # subscription_id = var.subscription_id
  # tenant_id       = var.tenant_id
}

provider "null" {

}

