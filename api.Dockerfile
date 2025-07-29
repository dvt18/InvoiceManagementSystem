# api.Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copy the pre-built application
COPY InvoiceSystem.API/publish/ ./

# Start the application directly
ENTRYPOINT ["dotnet", "InvoiceSystem.API.dll"]
