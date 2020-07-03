namespace SandaeMc.DomainLibrary
{
    public interface ISpecification<in T>
    {
        bool IsSatisfiedBy(T entity);
    }
}