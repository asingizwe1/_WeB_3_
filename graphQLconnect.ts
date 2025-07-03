 useEffect(() => {
    const query = `
    {
      delegations(first: 1000) {
        delegator
        delegate
        amount
      }
    }
   `;

    fetch("https://gateway.thegraph.com/api/subgraphs/id/ECQhJQV8KWMfAAgWf8W5duy1si9TnZpL4f194oGLrWW", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "01a14b22f6fc1cbd673a424e984dd25d", // 🔐 Replace with your actual API key
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.data || !res.data.delegations) {
          console.error("GraphQL response missing data:", res);
          return;
        }

        const nodesMap = new Map();
        const links = res.data.delegations.map((d) => {
          nodesMap.set(d.delegator, { id: d.delegator, group: "delegator" });
          nodesMap.set(d.delegate, { id: d.delegate, group: "delegate" });

          return {
            source: d.delegator,
            target: d.delegate,
            value: Number(d.amount),
          };
        });

        setNodes(Array.from(nodesMap.values()));
        setLinks(links);
      })
      .catch((err) => {
        console.error("GraphQL fetch failed:", err);
      });

    // ✅ Keep this if your /api/stewards route works
    fetch("/api/stewards")
      .then((res) => res.json())
      .then((data) => setStewards(data));
  }, []);
