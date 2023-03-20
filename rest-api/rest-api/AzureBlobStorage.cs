using Azure.Storage.Blobs;
using rest_api.Models;

public class AzureBlobStorage : IBlobStorageClient
{
    private readonly ConnectionStringsOptions _connectionStrings;

    public AzureBlobStorage(ConnectionStringsOptions connectionsStringOptions)
    {
        _connectionStrings = connectionsStringOptions;
    }


    public bool UploadFile(TextFile textFile)
    {
        try
        {
            // Create a client that can authenticate with a connection string
            BlobServiceClient blobServiceClient = new BlobServiceClient(_connectionStrings.azureBlobStorage);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient("jgkplaygroundc");
            var blobClient = blobContainerClient.GetBlobClient(textFile.FileName);
            using (var fileStream = textFile.openFileStream())
            {
                var response = blobClient.Upload(fileStream);
            }
            textFile.delete();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}
