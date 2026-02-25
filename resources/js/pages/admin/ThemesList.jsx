import { useEffect, useState } from "react";
import { getAdminThemes, deleteTheme } from "@/services/theme";
import { Link } from "react-router-dom";

export default function ThemesList() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = () => {
    getAdminThemes().then(res => setThemes(res.data));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this theme?')) {
      await deleteTheme(id);
      loadThemes();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Themes</h1>
        <Link 
          to="/admin/themes/new" 
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Add Theme
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Slug</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {themes.map(t => (
              <tr key={t.id} className="hover:bg-[var(--background)] transition-colors">
                <td className="py-3 px-4 text-[var(--foreground)]">{t.name}</td>
                <td className="py-3 px-4 text-[var(--muted-foreground)]">{t.slug}</td>
                <td className="py-3 px-4 text-right space-x-3">
                  <Link 
                    to={`/admin/themes/${t.id}/edit`}
                    className="text-[var(--primary)] hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:text-red-400 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {themes.length === 0 && (
              <tr>
                <td colSpan="3" className="py-8 text-center text-[var(--muted-foreground)]">
                  No themes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
