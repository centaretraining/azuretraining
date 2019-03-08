
## Note 
This is a list of commands to do different things in EF Core.
These should be executed from the folder with the MenuService.sln file

## Migrations
dotnet ef migrations add <Migration Name> --startup-project ./MenuService/ --project ./MenuService.Data --verbose

## Database update
dotnet ef database update --startup-project ./MenuService/ --project ./MenuService.Data --verbose
