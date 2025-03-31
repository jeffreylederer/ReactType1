using System.Security.Cryptography;
using System.Text;


namespace ReactType1.Server.Code
{
    public class GetSha256Hash
    {
        public static string Encode(string input)
        {
            using (var hashAlgorithm = SHA256.Create())
            {
                var byteValue = Encoding.UTF8.GetBytes(input);
                var byteHash = hashAlgorithm.ComputeHash(byteValue);
                return Convert.ToBase64String(byteHash);
            }
        }
    }
}
