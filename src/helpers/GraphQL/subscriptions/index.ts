import gql from "graphql-tag";

export const suscripRealCount = (activitySlug: string) => {
  return gql`
    subscription SubscripRealTotalCount {
      register: ${activitySlug}_register_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  `;
};

export const suscripFakeCount = (activitySlug: string) => {
  return gql`
    subscription SubscripFakeCount {
      register_count: ${activitySlug}_register_count(where: { id: { _eq: "1" } }) {
        count
      }
    }
  `;
};

export const suscripAllPlayers = (activitySlug: string) => {
  return gql`
    subscription SubscripAllPlayers {
      register: ${activitySlug}_register(order_by: { id: desc }) {
        id
        phone
        region
        created_at
      }
    }
  `;
};

export const SUSCRIP_ALL_ACTIVITIES = gql`
  subscription SubscripAllActivities {
    activity(order_by: { id: desc }) {
      id
      name
      slug
      end_date
    }
  }
`;
