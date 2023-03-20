
using System.Text.RegularExpressions;

namespace rest_api.Models
{
    public class TextFile
    {
        public string FilePath { get; private set; }
        public string FileName { get; private set; }

        public TextFile(string fileName, string content)
        {
            FileName = Regex.Replace(fileName, @"/[^A-Za-z0-9]/", "");
            Directory.CreateDirectory("./TextFiles");
            FilePath = "./TextFiles/" + FileName;
            File.WriteAllText(FilePath, content);
        }

        public TextFile(string filePath)
        {
            FileName = filePath.Split('/').Last();
            FilePath = filePath;
        }

        public FileStream openFileStream()
        {
            return File.OpenRead(FilePath);
        }

        public void delete()
        {
            File.Delete(FilePath);
        }
    }
}

