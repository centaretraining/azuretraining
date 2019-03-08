
## Note 
This is a list of commands to do different things in EF Core.
These should be executed from the folder with the OrderService.sln file

## Migrations
dotnet ef migrations add <Migration Name> --startup-project ./OrderService/ --project ./OrderService.Data --verbose

## Database update
dotnet ef database update --startup-project ./OrderService/ --project ./OrderService.Data --verbose
