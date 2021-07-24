FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source

COPY TodoServer.csproj .
RUN dotnet restore

COPY . .
RUN rm appsettings.json
RUN mv appsettings.Docker.json appsettings.json
RUN dotnet publish -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "TodoServer.dll"]
