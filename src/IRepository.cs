using System.Threading;
using System.Threading.Tasks;
using CSharpFunctionalExtensions;

namespace SharpDomain
{
    public interface IRepository<T>
    {
        Task<Maybe<T>> FindOne(long id);

        void Add(T obj);

        void Remove(T obj);

        Task SaveAsync(CancellationToken cancellationToken);
    }
}