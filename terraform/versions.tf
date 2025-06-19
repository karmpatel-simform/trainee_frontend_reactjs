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
    resource_group_name  = "2vmComm"
    storage_account_name = "accs312"
    container_name       = "blobst1"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

provider "null" {

}
