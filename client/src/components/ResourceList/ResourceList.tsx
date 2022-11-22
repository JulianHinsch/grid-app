import { useGetAllQuery } from '../../services/resource';

function ResourceList() {
    const { data, error, isLoading } = useGetAllQuery('');

    return (
        <div className="resource-list">
            {JSON.stringify(data)}
        </div>
    )
}

export default ResourceList;
