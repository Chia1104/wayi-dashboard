import gql from "graphql-tag";

export const queryAllPlayers = (activitySlug: string) => {
  return gql`
    query QueryAllPlayers {
      register: ${activitySlug}_register(order_by: { created_at: desc }) {
        phone
        id
        created_at
      }
    }
  `;
};

export const queryRealAndFakeCount = (activitySlug: string) => {
  return gql`
    query RealTotalCount {
      ${activitySlug}_register_aggregate {
        aggregate {
          count(columns: id)
        }
      }
      starlight_orchestra_register_count {
        count
      }
    }
  `;
};

export const queryFakeTotalCount = (activitySlug: string) => {
  return gql`
    query FakeCount {
      ${activitySlug}_register_count(where: { id: { _eq: "1" } }) {
        count
      }
    }
  `;
};
