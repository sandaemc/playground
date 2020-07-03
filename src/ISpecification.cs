namespace SharpDomain
{
    public interface ISpecification<in T>
    {
        bool IsSatisfiedBy(T entity);
    }
}