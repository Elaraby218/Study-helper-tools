using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Study_helper_tools.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Task",
                table: "ToDos",
                newName: "TaskTitle");

            migrationBuilder.AddColumn<string>(
                name: "TaskDescription",
                table: "ToDos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskDescription",
                table: "ToDos");

            migrationBuilder.RenameColumn(
                name: "TaskTitle",
                table: "ToDos",
                newName: "Task");
        }
    }
}
