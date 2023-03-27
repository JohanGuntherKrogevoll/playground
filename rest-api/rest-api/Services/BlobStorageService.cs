using rest_api.Models;

public class BlobStorageService : IStorageService
{
    private IBlobStorageClient _blobStorageClient;

    public BlobStorageService(IBlobStorageClient blobStorageClient)
    {
        _blobStorageClient = blobStorageClient;
    }

    public void uploadTextFile(TextFile textFile)
    {
        _blobStorageClient.UploadFile(textFile);
    }
}