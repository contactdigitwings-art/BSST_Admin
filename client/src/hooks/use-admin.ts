import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useAdminStats() {
  return useQuery({
    queryKey: [api.admin.stats.path],
    queryFn: async () => {
      const res = await fetch(api.admin.stats.path);
      if (!res.ok) throw new Error("Failed to fetch admin stats");
      return api.admin.stats.responses[200].parse(await res.json());
    },
  });
}

export function useDonations() {
  return useQuery({
    queryKey: [api.admin.donations.path],
    queryFn: async () => {
      const res = await fetch(api.admin.donations.path);
      if (!res.ok) throw new Error("Failed to fetch donations");
      return api.admin.donations.responses[200].parse(await res.json());
    },
  });
}
