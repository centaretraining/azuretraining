
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

FROM microsoft/dotnet:2.2-aspnetcore-runtime AS final
WORKDIR /app
ENV ASPNETCORE_URLS http://+:5000
EXPOSE 5000

COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MenuService.dll"]