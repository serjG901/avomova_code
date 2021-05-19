import { gql } from "@apollo/client";

export const GET_MEDIA_LIST = gql`
  query getMediaList(
    $offset: Int!
    $limit: Int!
    $mediaType: MediaTypes!
    $filters: MediaFilters
  ) {
    getMediaList(
      offset: $offset
      limit: $limit
      mediaType: $mediaType
      filters: $filters
    ) {
      docs {
        mediaId
        mediaType
        title {
          be
          en
        }
        description {
          be
        }
        slug
        language
        genres
        studio
        year
        translators
        dubbers
        editors
      }
      totalDocs
      limit
      offset
    }
  }
`;

export const GET_MEDIA = gql`
  query media($slug: String!, $mediaType: MediaTypes!) {
    media(slug: $slug, mediaType: $mediaType) {
      mediaId
      title {
        be
        ru
        en
        alt
      }
      description {
        be
        ru
        en
      }
      studio
      status
      poster
      country
      year
      duraction {
        start
        end
      }
      date {
        created
        updated
      }
      language
      translators
      dubbers
      editors
      genres
    }
  }
`;

export const GET_UPDATES_LIST = gql`
  query getUpdatesList($offset: Int!, $limit: Int!, $type: UpdateType) {
    getUpdatesList(offset: $offset, limit: $limit, type: $type) {
      docs {
        title {
          ru
          be
          en
          alt
        }
        url
        poster
        type
        description {
          ru
          be
          en
        }
        duraction {
          start
          end
        }
        date {
          created
          updated
        }
      }
      totalDocs
    }
  }
`;

export const GET_MEDIA_EPISODES = gql`
  query media($slug: String!, $mediaType: MediaTypes!) {
    media(slug: $slug, mediaType: $mediaType) {
      mediaId
      episodes {
        id
        mediaId
        mediaType
        contentType
        type
        episode
        url
        resource
        thumbnail
        view
        date {
          created
          updated
        }
      }
    }
  }
`;

export const GET_MEDIA_CHAPTERS = gql`
  query media($slug: String!, $mediaType: MediaTypes!) {
    media(slug: $slug, mediaType: $mediaType) {
      mediaId
      chapters {
        chapter
        images {
          large
          thumbnail
        }
        view
        date {
          created
          updated
        }
      }
    }
  }
`;
