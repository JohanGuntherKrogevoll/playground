using Microsoft.AspNetCore.Mvc;
using rest_api.Models;

namespace rest_api.Controllers;

[ApiController]
[Route("[controller]")]
public class BlobStorageController : ControllerBase
{
    private readonly ILogger<BlobStorageController> _logger;
    private readonly IStorageService _blobStorageService;

    public BlobStorageController(ILogger<BlobStorageController> logger, IStorageService blobStorageService)
    {
        _blobStorageService = blobStorageService;
        _logger = logger;
    }

    [HttpPost(Name = "UploadTextFileToBlobStorage")]
    public void Post(string fileName, string content)
    {
        _blobStorageService.uploadTextFile(new TextFile(fileName, content));
    }
}

