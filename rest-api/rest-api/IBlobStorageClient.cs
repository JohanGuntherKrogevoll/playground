using rest_api.Models;

public interface IBlobStorageClient
{
    public bool UploadFile(TextFile textFile);
}