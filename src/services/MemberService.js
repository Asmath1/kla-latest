export const fetchKlaMembers = async (assemblyNumber = 15) => {
  try {
    const response = await fetch(`https://klademo.cditproject.org/api/kla-members/${assemblyNumber}`, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    if (data.status && data.data) {
      return data.data; // ✅ Return members list
    } else {
      throw new Error("No member data found.");
    }
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};