package services

import "chatservice/models"

func GetUser() models.User {
	return models.User{
		ID:   1,
		Name: "Andrew",
	}
}

func CreateUser(name string) models.User {
	return models.User{
		ID:   2,
		Name: name,
	}
}