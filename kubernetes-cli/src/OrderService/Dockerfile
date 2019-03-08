FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["OrderService/OrderService.csproj", "OrderService/"]
COPY ["OrderService.Data/OrderService.Data.csproj", "OrderService.Data/"]
RUN dotnet restore "OrderService/OrderService.csproj"
COPY . .
WORKDIR "/src/OrderService"
RUN dotnet build "OrderService.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "OrderService.csproj" -c Release -o /app

FROM microsoft/dotnet:2.2-aspnetcore-runtime AS final
WORKDIR /app
ENV ASPNETCORE_URLS http://+:5001
EXPOSE 5001

COPY --from=publish /app .
ENTRYPOINT ["dotnet", "OrderService.dll"]