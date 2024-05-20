import { StyleSheet } from 'react-native';
import { Colors } from '../../../ui/constants';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  authorName: {
    color: Colors.greysGrey6,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  creation: {
    color: Colors.greysGrey4,
  },
  content: {
    fontSize: 16,
    color: Colors.greysGrey5,
    lineHeight: 24,
    textAlign: 'left',
    paddingBottom: 5,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  replyButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    width: 60,
    height: 24,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 8,
    marginLeft: 20,
  },
  replyButtonLabel: {
    fontSize: 12,
    color: Colors.primary_700,
    fontWeight: 'bold',
  },
});
