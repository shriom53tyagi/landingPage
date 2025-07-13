import { useState, useEffect } from "react";
import { CoachData, GetCoachResponse } from "@shared/coach";

export function useCoachData(coachId?: string) {
  const [coachData, setCoachData] = useState<CoachData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = coachId ? `/api/coach/${coachId}` : "/api/coach";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GetCoachResponse = await response.json();

        if (result.success) {
          setCoachData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch coach data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching coach data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoachData();
  }, [coachId]);

  return { coachData, loading, error };
}
