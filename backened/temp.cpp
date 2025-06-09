class solution
{

    class tuple
    {

    public:
        int node;
        int mask;
        int count;

        tuple(int node, int mask, int count)
        {
            this->node = node;
            this->mask = mask;
            this->count = count;
        }
    };

public:
    int shortestPath(vector<vector<int>> &graph)
    {

        int n = graph.size();

        queue<tuple> Q;
        set<pair<int, int>> visited;

        // queue all node as the start
        for (int i = 0; i < n; i++)
        {

            tuple curr = tuple(i, 1 << i, 1);
            Q.push(curr);
            visited.insert({i, 1 << i});
        }2

        while (!Q.empty())
        {

            auto curr = Q.front();
            Q.pop();

            // path length = number of nodes - 1
            if (curr.mask == 1 << n - 1)
                return curr.count - 1;

            for (auto nbr : graph[curr.node])
            {

                int mask = (curr.mask) | (1 << nbr);
                tuple next = tuple(nbr, mask, curr.count + 1);
                pair<int, int> val = {nbr, mask};

                if (visited.find(val) != visited.end())
                    continue;

                visited.insert(val);
                Q.push(next);
            }
        }

        return -1;
    }
};
