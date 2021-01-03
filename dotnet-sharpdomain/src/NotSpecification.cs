using System;

namespace SharpDomain
{
    public class NotSpecification<T> : ISpecification<T>
    {
        private readonly ISpecification<T> _spec;

        public NotSpecification(ISpecification<T> spec)
        {
            _spec = spec ?? throw new ArgumentNullException(nameof(spec));
        }


        public bool IsSatisfiedBy(T entity)
        {
            return !_spec.IsSatisfiedBy(entity);
        }
    }
}