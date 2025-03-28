# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY PumpManagement/PumpManagement.csproj PumpManagement/
RUN dotnet restore PumpManagement/PumpManagement.csproj
COPY . .
WORKDIR /src/PumpManagement
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5097
EXPOSE 5097
ENTRYPOINT ["dotnet", "PumpManagement.dll"]
