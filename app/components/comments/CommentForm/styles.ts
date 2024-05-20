import { StyleSheet } from 'react-native';
import { Colors } from '../../../ui/constants';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 13,
  },
  inputArea: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: Colors.greysLight,
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  input: {
    display: 'flex',
    color: Colors.greysGrey5,
    height: 87,
    flexGrow: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  mention: {
    fontSize: 16,
    color: Colors.skooveLighterBlue,
    lineHeight: 24,
    fontWeight: 'bold',
    marginTop: 7,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  submitButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primary_700,
    marginLeft: 8,
  },
  submitButtonLabel: {
    fontSize: 14,
    color: Colors.skooveWhite,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  cancelButton: {
    width: 100,
    height: 36,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary_100,
  },
  cancelButtonLabel: {
    fontSize: 14,
    color: Colors.primary_700,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
