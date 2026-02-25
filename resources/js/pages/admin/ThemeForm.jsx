import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, getTheme, updateTheme } from "@/services/theme";

export default function ThemeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });

  useEffect(() => {
    if (id) {
      loadTheme();
    }
  }, [id]);

  const loadTheme = async () => {
    try {
      setLoading(true);
      const res = await getTheme(id);
      setFormData(res.data);
    } catch (error) {
      console.error("Failed to load theme", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateTheme(id, formData);
      } else {
        await createTheme(formData);
      }
      navigate("/admin/themes");
    } catch (error) {
      console.error("Failed to save theme", error);
      alert("Failed to save theme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
        {id ? "Edit Theme" : "Create Theme"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/themes")}
            className="px-4 py-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Theme"}
          </button>
        </div>
      </form>
    </div>
  );
}
