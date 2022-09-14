import gql from "graphql-tag";

export const mutationUpdateFakeCount = (activitySlug: string) => {
  return gql`
    mutation UpdateFakeCount($count: Int!) {
      update_${activitySlug}_register_count(
        _set: { count: $count }
        where: { id: { _eq: "1" } }
      ) {
        returning {
          count
        }
      }
    }
  `;
};
