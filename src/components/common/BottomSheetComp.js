import React, {useRef, useMemo, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {moderateScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const BottomSheetComp = forwardRef(
  ({children, snapPointsProp, headerStyles = {}}, ref) => {
    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(
      () => snapPointsProp || ['10%', '30%', '50%', '70%', '90%'],
      [snapPointsProp],
    );

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.snapToIndex(snapPoints.length - 1),
      close: () => bottomSheetRef.current?.close(),
    }));

    const handleSheetChange = index => {
      if (index === 0) {
        bottomSheetRef.current?.close();
      }
    };

    const handleClose = () => {
      bottomSheetRef.current?.close();
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        onClose={handleClose}
        style={styles.bottomSheet}
        handleStyle={[styles.headerStyles, headerStyles]}>
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: colors.theme,
    padding: moderateScale(10),
  },
  bottomSheet: {
    marginBottom: 0,
    margin: 0,
  },
  headerStyles: {
    backgroundColor: colors.green,
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
});

export default BottomSheetComp;
