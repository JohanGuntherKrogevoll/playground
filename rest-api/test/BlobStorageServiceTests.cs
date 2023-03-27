using rest_api.Models;

namespace test;

[TestClass]
public class BlobStorageServiceTests
{

    [TestMethod]
    public void ShouldUploadFile()
    {
        var fakeBlobStorageClient = new FakeBlobStorageClient();
        var blobStorageService = new BlobStorageService(fakeBlobStorageClient);
        var textFile = new TextFile("HelloWorld.txt", "Hello world!");
        blobStorageService.uploadTextFile(textFile);
        Assert.IsTrue(fakeBlobStorageClient.isUploaded);
    }

    [TestMethod]
    public void UploadedFileShouldHaveCorrectContent()
    {
        var fakeBlobStorageClient = new FakeBlobStorageClient();
        var blobStorageService = new BlobStorageService(fakeBlobStorageClient);
        var textFile = new TextFile("TestFile.txt", "Hello world!");
        blobStorageService.uploadTextFile(textFile);
        Assert.AreEqual("Hello world!", File.ReadAllText(fakeBlobStorageClient.uploadedFilePath));
    }

}

internal class FakeBlobStorageClient : IBlobStorageClient
{
    public bool isUploaded
    {
        get; private set;
    }

    public string uploadedFilePath
    {
        get; private set;
    }

    public FakeBlobStorageClient()
    {
        uploadedFilePath = "";
        isUploaded = false;
    }

    public bool UploadFile(TextFile textFile)
    {
        isUploaded = true;
        uploadedFilePath = textFile.FilePath;
        return true;
    }
}