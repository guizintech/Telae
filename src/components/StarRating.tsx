import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
};

function StarRating({ value = 0, onChange }: Props) {
  const [rating, setRating] = useState(value);

  function handlePress(star: number, half: boolean) {
    const newRating = half ? star - 0.5 : star;

    setRating(newRating);

    if (onChange) {
      onChange(newRating);
    }
  }

  function renderStar(star: number) {
    const filled = rating >= star;
    const half = rating === star - 0.5;

    return (
      <View key={star} style={styles.starContainer}>

        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => handlePress(star, true)}
        />

        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => handlePress(star, false)}
        />

        <Text style={styles.emptyStar}>
          ☆
        </Text>

        {filled && (
          <Text style={styles.fullStar}>
            ★
          </Text>
        )}

        {half && (
          <View style={styles.halfStar}>
            <Text style={styles.fullStar}>
              ★
            </Text>
          </View>
        )}

      </View>
    );
  }

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map(renderStar)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  starContainer: {
    width: 45,
    height: 50,
    position: 'relative',
  },

  emptyStar: {
    fontSize: 40,
    color: '#999',
    position: 'absolute',
  },

  fullStar: {
    fontSize: 40,
    color: '#FFD700',
    position: 'absolute',
  },

  halfStar: {
    position: 'absolute',
    width: 18,
    height: 45,
    overflow: 'hidden',
  },

  leftButton: {
    position: 'absolute',
    width: 22,
    height: 45,
    zIndex: 3,
  },

  rightButton: {
    position: 'absolute',
    right: 0,
    width: 22,
    height: 45,
    zIndex: 3,
  },
});

export default StarRating;