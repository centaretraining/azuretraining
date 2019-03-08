FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["MenuService/MenuService.csproj", "MenuService/"]
COPY ["MenuService.Data/MenuService.Data.csproj", "MenuService.Data/"]
RUN dotnet restore "MenuService/MenuService.csproj"
COPY . .
WORKDIR "/src/MenuService"
RUN dotnet build "MenuService.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "MenuService.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MenuService.dll"]