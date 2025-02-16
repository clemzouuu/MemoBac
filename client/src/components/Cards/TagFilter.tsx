import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const TagFilter = ({ onSelectTag }: { onSelectTag: (tag: string) => void }) => {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await apiClient.get('/cards');
                const uniqueTags = [...new Set(response.data.map((card: any) => card.tag))];
                setTags(uniqueTags.filter((tag): tag is string => !!tag));
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        fetchTags();
    }, []);

    return (
        <select
            onChange={(e) => onSelectTag(e.target.value)}
            className="tag-filter"
        >
            <option value="">Tous les tags</option>
            {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
            ))}
        </select>
    );
};

export default TagFilter;