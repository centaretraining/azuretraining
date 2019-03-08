using Microsoft.EntityFrameworkCore.Migrations;

namespace MenuService.Data.Migrations
{
    public partial class update_menu_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenusItem_Menu_MenuId",
                table: "MenusItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenusItem",
                table: "MenusItem");

            migrationBuilder.RenameTable(
                name: "MenusItem",
                newName: "MenuItem");

            migrationBuilder.RenameIndex(
                name: "IX_MenusItem_MenuId",
                table: "MenuItem",
                newName: "IX_MenuItem_MenuId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenuItem",
                table: "MenuItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_Menu_MenuId",
                table: "MenuItem",
                column: "MenuId",
                principalTable: "Menu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_Menu_MenuId",
                table: "MenuItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenuItem",
                table: "MenuItem");

            migrationBuilder.RenameTable(
                name: "MenuItem",
                newName: "MenusItem");

            migrationBuilder.RenameIndex(
                name: "IX_MenuItem_MenuId",
                table: "MenusItem",
                newName: "IX_MenusItem_MenuId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenusItem",
                table: "MenusItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MenusItem_Menu_MenuId",
                table: "MenusItem",
                column: "MenuId",
                principalTable: "Menu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
